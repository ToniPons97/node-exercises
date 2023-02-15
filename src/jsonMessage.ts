type JsonResponse = {
    msg: string
}

const jsonMessage = (msg: string): JsonResponse => ({msg});
export default jsonMessage;