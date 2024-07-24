import { IConfig, TNetwork } from './interface';

export class ConfigService {

    protected config: IConfig;
    protected static instance: ConfigService;

    public get network(): TNetwork {
        return this.config.network;
    }

    public get api(): IConfig['api'] {
        return this.config.api;
    }

    public get test(): IConfig['test'] {
        return this.config.test;
    }

    constructor(config: IConfig) {
        if (ConfigService.instance) {
            return ConfigService.instance;
        }
        this.config = config;
        ConfigService.instance = this;
    }

    public static getInstance(): ConfigService {
        return ConfigService.instance;
    }
}