const { Router } = require('express');
const SalesService = require('../services/SalesService');

const SUCCESS = 200;
const NOTFOUND = 404;
const UNPROCESSABLEENTITY = 422;

const SalesController = new Router();

// Desafio 5 - Cadastra uma venda
SalesController.post('/', async (req, res) => {
  const itensSold = req.body;
  const sale = await SalesService.createSale(itensSold);
  if (sale.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: sale.message
    }}
  );
  res.status(SUCCESS).json(sale);
});

// Desafio 6 - Listar todas as vendas
SalesController.get('/', async (req, res) => {
  const sales = await SalesService.getAllSales();
  res.status(SUCCESS).json(sales);
});

// Desafio 6 - Busca uma venda pelo id
SalesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, result } = await SalesService.findByIdSale(id);
  if (status === 'NOK') {
    return res.status(NOTFOUND)
      .json({err: { code: 'not_found', message: result }});
  }
  res.status(SUCCESS).json(result);
});

// Desafio 7 - Atualizar uma venda pelo id
SalesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const sale = await SalesService.updateByIdSale(id, itensSold);
  if (sale.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: sale.message
    }}
  );
  res.status(SUCCESS).json(sale);
});

// Desafio 8 - Deletar uma venda pelo id
SalesController.delete('/:id', async (req, res)  => {
  const { id } = req.params;
  const { status, result } = await SalesService.deleteByIdSale(id);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { code: 'invalid_data', message: result }});
  }
  res.status(SUCCESS).json(result);
});

module.exports = SalesController;
