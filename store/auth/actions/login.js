import decodeUserId from "./decodeUserId";
export default async function () {
    try {
        const res = await useFetch(`/api/auth/login`, {
            body: {
                username: this.email,
                password: this.password,
            },
            method: "post",
        });
        // save in cookies
        console.log(res.data);
        const cookies = useCookie("authorization");
        cookies.value = res.data.value.token;
        // sign as logged in
        this.loggedIn = true;
        // decode data to store
        await decodeUserId(res.data.value.token);
    } catch (err) {
        console.log(err);
    }
}
