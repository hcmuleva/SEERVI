
async function allBoard(parent, args, { prisma ,request}, info) {

    const boardResult = await prisma.query.boards({
        
    }, info)

    return boardResult
}
export default allBoard;