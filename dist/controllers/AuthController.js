"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.someProtectedRouteHandler = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const validator_1 = __importDefault(require("validator"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const existingEmailUser = yield User_1.default.findOne({ where: { email: email } });
        if (existingEmailUser) {
            return res.status(400).json({ error: 'Email já existe' });
        }
        const existingUsernameUser = yield User_1.default.findOne({ where: { username: username } });
        if (existingUsernameUser) {
            return res.status(400).json({ error: 'Nome de usuário já existe' });
        }
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'Email, nome de usuário e senha são obrigatórios' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.default.create({
            email: email,
            username: username,
            password: hashedPassword
        });
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
    }
    try {
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'segredo');
        res.json({ token });
    }
    catch (error) {
        console.error('Erro ao fazer login do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.login = login;
const someProtectedRouteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, authMiddleware_1.verifyToken)(req, res, () => {
            res.json({ message: 'Usuário autenticado acessando rota protegida' });
        });
    }
    catch (error) {
        console.error('Erro ao lidar com rota protegida:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.someProtectedRouteHandler = someProtectedRouteHandler;
