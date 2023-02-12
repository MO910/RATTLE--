export default async function () {
    // remove all auth store data
    this.$reset();
    // delete authorization cookie
    const cookies = useCookie("authorization");
    cookies.value = null;
    // redirect to login
    await navigateTo("/login");
}
