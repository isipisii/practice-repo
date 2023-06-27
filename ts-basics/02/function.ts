// the string type after the function parameter serves as the return type
const loginUserWithReturnType = (name: string, email: string, isPaid: true): string => `${name} ${email} ${isPaid}`

const loginUser = (name: string, email: string, isPaid: true): void => console.log(`${name} ${email} ${isPaid}`);

// never return type is commonly used when handling error
function handleError(errMsg: string): never{
    throw new Error(errMsg)
}


export{}