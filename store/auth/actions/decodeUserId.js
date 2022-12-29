export default async function (authorizationToken) {
    try {
        // use cookie
        if (!authorizationToken) {
            const cookies = useCookie("authorization");
            authorizationToken = cookies.value;
        }
        // if there is no cookie
        if (!authorizationToken) return;
        // decode API
        const res = await useFetch(`/api/auth/user`, {
            onRequest({ _, options }) {
                options.headers = { authorization: authorizationToken };
            },
            method: "get",
        });
        // save in cookies
        this.userId = res.data.value.user._id;
    } catch (err) {
        console.log(err);
    }
}
