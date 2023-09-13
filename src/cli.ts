import { parse as parseArgs } from "https://deno.land/std@0.201.0/flags/mod.ts";
import { bundle as generateBundle } from "https://deno.land/x/emit@0.24.0/mod.ts";
import { ensureDir } from "https://deno.land/std@0.201.0/fs/mod.ts";
import { dirname } from "https://deno.land/std@0.201.0/path/mod.ts";
import { readTsconfigCompilerOptions } from "./read_tsconfig_compiler_options.ts";

const args = parseArgs(Deno.args);
    
const compilerOptions = readTsconfigCompilerOptions(args.config || './tsconfig.json');

const bundleKeyValue = args._.map((srcDist) => srcDist.toString().split('='));

bundleKeyValue.forEach(([srcPath, distPath]) => {
    generateBundle(
        srcPath,
        {compilerOptions: compilerOptions}
    ).then(({code}) => {
        ensureDir(dirname(distPath)).then(() => {
            Deno.writeTextFile(distPath, code)
        })
    })
})
