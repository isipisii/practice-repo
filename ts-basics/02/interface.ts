interface User {
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string
}

const ale: User = { dbId: 123, email: "asdasd", userId: 123, googleId: "1asd23142"}