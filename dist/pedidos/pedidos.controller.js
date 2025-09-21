"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosController = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = __importDefault(require("./pedidos.service"));
let PedidosController = class PedidosController {
    processar(body) {
        try {
            const processando = pedidos_service_1.default.processarPedidos(body.pedidos);
            return processando;
        }
        catch (error) {
            return "Erro ";
        }
    }
};
exports.PedidosController = PedidosController;
__decorate([
    (0, common_1.Post)("processar"),
    __param(0, (0, common_1.Body)())
], PedidosController.prototype, "processar", null);
exports.PedidosController = PedidosController = __decorate([
    (0, common_1.Controller)("pedidos")
], PedidosController);
