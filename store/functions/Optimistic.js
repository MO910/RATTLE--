// Dependencies
import treeFinder from "./treeFinder";

function push(state, [obj, value, method = "push", spread = false]) {
    const target = eval(`state.${obj}`);
    if (spread)
        return eval(
            `state.${obj} = [...${JSON.stringify(
                target || []
            )}, ...${JSON.stringify(value)}]`
        );
    target[method](value);
}
// export
export default class {
    constructor({ state, dispatch, request, dataKey, stringifyArgs }) {
        this.state = state;
        // this.commit = commit;
        this.stringifyArgs = stringifyArgs;
        this.dispatch = dispatch;
        this.request = request;
        this.dataKey = dataKey;
    }
    // add item response
    async add({
        requestData,
        id,
        nodePath,
        tree,
        targetArray,
        refresh,
        doRequest = true,
    }) {
        const { state } = this;
        // search for node if not provided
        nodePath =
            nodePath ||
            treeFinder({
                id,
                tree,
                branch: state,
            });
        let fullPath = nodePath;
        if (targetArray) fullPath += `.${targetArray}`;
        // push the object to it
        const itemIndex = eval(`state.${fullPath}?.length`);
        let spread = requestData instanceof Array;
        // push to state
        push(state, [fullPath, requestData, "push", spread]);
        // try the request
        try {
            if (doRequest) {
                this.data = await this.request(this.stringifyArgs);
                console.log(this.data);
                const response = this.data[this.dataKey];
                // update state and add ID (real response)
                if (response instanceof Array) {
                    eval(`state.${fullPath} = response`);
                } else {
                    const itemId = response?.id;
                    eval(`state.${fullPath}[${itemIndex}].id = "${itemId}"`);
                }
            }
        } catch (err) {
            // if error delete the added item
            // commit("remove", [fullPath, itemIndex]);
            eval(`state.${fullPath}.splice(${itemIndex}, 1)`);
            console.log(err);
        }
        // refresh
        // refresh = refresh || fullPath;
        return this.data?.[this.dataKey];
    }
    // remove item response
    async remove({ id, tree, callbackBefore, callbackAfter }) {
        const { state } = this;
        const nodePath = treeFinder({
                id,
                tree,
                branch: state,
            }),
            indexRegExp = /\[\d+\]$/,
            allListPath = nodePath.replace(indexRegExp, ""),
            findItemPath = `${allListPath}.find(x => x.id =="${id}")`;
        // and store it for returning
        const element = { ...eval(`state.${findItemPath}`) };
        // element.hide = false;
        // hide temporary until it is cleared from DB (optimistic response)
        // commit("updateModel", [`${findItemPath}.hide`, true]);
        eval(`state.${findItemPath}.hide = true`);
        // do action before actually removing
        if (callbackBefore) await callbackBefore(element);
        // refresh
        // commit("refreshObj", allListPath);
        // prepare output
        let output = [allListPath, element];
        try {
            this.data = await this.request();
            // add the data
            output.push(this.data[this.dataKey]);
            // if not deleted threw error
            if (!this.data[this.dataKey]) throw "error";
            // do action after actually removing
            if (callbackAfter)
                await callbackAfter(findItemPath, ...output.slice(1));
            // delete the element form list (real response)
            const index = eval(`state.${allListPath}`).reduce(
                (acc, item, i) => {
                    if (item.id == id) return i;
                    return acc;
                },
                null
            );
            // unhide the element
            // commit("updateModel", [`${findItemPath}.hide`, false]);
            eval(`state.${findItemPath}.hide = false`);
            // actually remove the element
            if (index != null) {
                // commit("remove", [allListPath, index]);
                eval(`state.${allListPath}.splice(${index}, 1)`);
            }
            return output;
        } catch (err) {
            console.log(err);
            // if error restore the item
            // commit("updateModel", [`${findItemPath}.hide`, false]);
            eval(`state.${findItemPath}.hide = false`);
            // commit("refreshObj", allListPath);
            return output;
        }
    }
    //
    async update({ id, requestData, tree, targetArray }) {
        const { state } = this;
        const nodePath = treeFinder({
            id,
            tree,
            branch: state,
        });
        let fullPath = nodePath;
        if (targetArray) fullPath += `.${targetArray}`;
        const oldValue = eval(`state.${fullPath}`);
        // update state optimistically
        // commit("updateModel", [fullPath, { ...oldValue, ...requestData }]);
        eval(`state.${fullPath} = ${{ ...oldValue, ...requestData }}`);
        // try the request
        try {
            this.data = await this.request();
        } catch (err) {
            console.log(err);
            // undo optimistic
            // commit("updateModel", [fullPath, oldValue]);
            eval(`state.${fullPath} = ${oldValue}`);
        }
    }
    // transport from array to another
    async transport({ removeId, addId, treeFrom, treeTo }) {
        // remove the existing entity
        const [_, requestData] = await this.remove({
            id: removeId,
            tree: treeFrom,
        });
        // add it to ...
        await this.add({
            doRequest: false,
            id: addId,
            requestData,
            tree: treeTo.slice(0, -1),
            targetArray: treeTo.at(-1),
        });
    }
}
//
