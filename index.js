const packageJson = (await import(new URL("./package.json", import.meta.url), { with: { type: "json" } })).default;

class GraphJsonResolverLoader {
  constructor(compilation) {
    this.compilation = compilation;
  }

  shouldResolve(url) {
    return url.pathname === '/graph.json' && process.env.__GWD_COMMAND__ === 'develop';
  }

  resolve() {
    return new Request(new URL('./graph.json', this.compilation.context.scratchDir));
  }
}

const greenwoodThemeStarterPresentation = (options = {}) => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (compilation) => {
    const layoutsLocation = options.__isDevelopment
      ? new URL('./templates/', compilation.context.userWorkspace)
      : new URL('./dist/templates/', import.meta.url);

    return {
      layouts: [
        layoutsLocation
      ]
    };
  }
}, {
  type: 'resource',
  name: `${packageJson.name}:resource`,
  provider: (compilation) => new GraphJsonResolverLoader(compilation)
}];

export {
  greenwoodThemeStarterPresentation
};