import { CompilerOptions } from "https://deno.land/x/emit@0.24.0/mod.ts";

export function readTsconfigCompilerOptions(path : string) : CompilerOptions | undefined {
    try {
        const compilerOptions : CompilerOptions = JSON.parse(Deno.readTextFileSync(path))?.compilerOptions;
        return {
            checkJs: compilerOptions?.checkJs == undefined ? false : compilerOptions.checkJs,
            emitDecoratorMetadata: compilerOptions?.emitDecoratorMetadata == undefined ? false : compilerOptions.emitDecoratorMetadata,
            importsNotUsedAsValues: compilerOptions?.importsNotUsedAsValues == undefined ? '' : compilerOptions.importsNotUsedAsValues,
            inlineSourceMap: compilerOptions?.inlineSourceMap == undefined ? false : compilerOptions.inlineSourceMap,
            inlineSources: compilerOptions?.inlineSources == undefined ? false : compilerOptions.inlineSources,
            jsx: compilerOptions?.jsx == undefined ? 'jsx' : compilerOptions.jsx,
            jsxFactory: compilerOptions?.jsxFactory == undefined ? 'h' : compilerOptions.jsxFactory,
            jsxFragmentFactory: compilerOptions?.jsxFragmentFactory == undefined ? 'Fragment' : compilerOptions?.jsxFragmentFactory,
            sourceMap: compilerOptions?.sourceMap == undefined ? false : compilerOptions.sourceMap
        }
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            return {}
        }
        if (error instanceof SyntaxError) {
            throw new Error(`Error while parsing "tsconfig.json", at: ${error.stack}`)
        }
    }
}
