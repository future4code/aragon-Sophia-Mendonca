export class PingBusiness {
    public ping = async () => {
        const responsePing = {
            message: "Pong!"
        }

        return responsePing
    }
}