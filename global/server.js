import isProduction from './env'

const server = isProduction ? 'https://lottery-chain.anlink.com' : 'https://lottery-chain.anlink.tech'

export default server