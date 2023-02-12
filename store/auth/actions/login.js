import decodeUserId from "./decodeUserId";

export default async function () {
    this.loading = true;
    try {
        const res = await useFetch(`/api/auth/login`, {
            body: {
                username: this.id_number,
                password: this.password,
            },
            method: "post",
        });
        // save in cookies
        const cookies = useCookie("authorization");
        cookies.value = res.data.value.token;
        // sign as logged in
        this.loggedIn = true;
        // decode data to store
        //  decodeUserId(this, );
        await decodeUserId.apply(this, [res.data.value.token]);
    } catch (err) {
        console.log(err);
    }
    this.loading = false;
}
