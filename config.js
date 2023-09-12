import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--mode <mode>', 'modo en el que se levantara la app', 'dev');
program.parse();

const mode = program.opts().mode;

dotenv.config({
    path: mode == 'dev' ? '.env.development' : '.env.production'
});

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}