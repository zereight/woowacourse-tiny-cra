const tsconfig = `{
    "compilerOptions": {
      "target": "es5",
      "module": "esnext",
      "allowJs": true,
      "jsx": "react-jsx",
      "sourceMap": true,
      "outDir": "./build",  
      "strict": true,
      "moduleResolution": "node",
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "noImplicitAny": true, 
      "strictNullChecks": true,
      "noImplicitReturns": true 
    },
    "include": ["./src/**/*"]
  }
  `;

module.exports = tsconfig;
