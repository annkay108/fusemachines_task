"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // Mongoose connection
        mongoose_1.default.connect(process.env.MONGODB_URI, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log("Connected to database"))
            .catch((err) => console.log(err));
        // Setting the port value
        this.app.set("port", process.env.PORT || 5000);
        // Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // CORS MIDDLEWARE SETUP
        this.app.use(cors_1.default({
            credentials: true,
            origin: [process.env.PUBLIC_DOMAIN]
        }));
    }
    routes() {
        this.app.use("/course", courseRoutes_1.default);
        this.app.use("/file", fileRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server is listening on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map