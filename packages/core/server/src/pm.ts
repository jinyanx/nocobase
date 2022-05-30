import { Collection, Model, Repository } from '@nocobase/database';
import Application from './application';
import { Plugin } from './plugin';

class PluginRepository extends Repository {
  async add(name: string | string[], options) {}
  async enable(name: string | string[], options) {}
  async disable(name: string | string[], options) {}
  async remove(name: string | string[], options) {}
  async upgrade(name: string | string[], options) {}
}

class PluginModel extends Model {
  getInstance(): Plugin {
    return;
  }
}

export class PM {
  protected app: Application;

  collection: Collection;

  repository: PluginRepository;

  constructor(app: Application) {
    this.app = app;
    this.collection = app.db.collection({
      name: 'plugins',
      model: PluginModel,
      repository: PluginRepository,
      fields: [
        { type: 'string', name: 'name' },
        { type: 'string', name: 'version' },
        { type: 'boolean', name: 'enabled' },
      ],
    });
    this.repository = this.collection.repository as PluginRepository;
    this.app.resourcer.define({
      name: 'plugins',
      actions: {
        async add(ctx, next) {
          ctx.app.pm.add();
          await next();
        },
        async enable(ctx, next) {
          ctx.app.pm.enable();
          await next();
        },
        async disable(ctx, next) {
          ctx.app.pm.disable();
          await next();
        },
        async upgrade(ctx, next) {
          ctx.app.pm.upgrade();
          await next();
        },
        async remove(ctx, next) {
          ctx.app.pm.remove();
          await next();
        },
      },
    });
    this.app.on('beforeInstall', async () => {
      await this.collection.sync();
      await this.add(this.app.options.plugins as any, {
        locked: true,
      });
      await this.load();
    });
  }

  async load() {
    await this.app.emitAsync('beforeLoadAll');
    const plugins = await this.repository.find<PluginModel>();
    for (const plugin of plugins) {
      const instance = plugin.getInstance();
      instance.beforeLoad();
    }
    for (const plugin of plugins) {
      const instance = plugin.getInstance();
      await this.app.emitAsync('beforeLoadPlugin', instance);
      instance.load();
      await this.app.emitAsync('afterLoadPlugin', instance);
    }
    await this.app.emitAsync('afterLoadAll');
  }

  async add(name: string | string[], options) {
    // 如果插件没有下载到本地，需要先 yarn add 下载到本地
    await this.repository.add(name, options);
  }

  async enable(name: string | string[], options) {
    // 需要 beforeLoad, load，可能需要 install
    // 这里需要自动载入机制，而不是交由开发控制
    await this.repository.enable(name, options);
  }

  async disable(name: string | string[], options) {
    // plugin.disable();
    // 移除配置即可，热插拔的机制很重要
    await this.repository.disable(name, options);
  }

  async upgrade(name: string | string[], options) {
    // plugin.upgrade()
    // 下载最新源码，执行 migrate
    await this.repository.upgrade(name, options);
  }

  async remove(name: string | string[], options) {
    // 将插件包从列表里移除，插件包可以保留本地不删除
    await this.repository.remove(name, options);
  }
}
