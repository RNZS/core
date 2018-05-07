'use strict';

module.exports = `
  type Query {
    block(id: String): Block
    blocks(limit: Limit, orderBy: OrderByInput): [Block]
    transaction(id: String): Transaction
    transactions(limit: Limit, orderBy: OrderByInput, filter: TransactionFilter): [Transaction]
  }
`