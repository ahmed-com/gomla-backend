# 1. Make sure you have nest cli
`npm install -g @nestjs/cli`
# 2. install cross-env 
`npm install -g cross-env`

# 3. use [this script](./src/scripts/genKeys.js) to generate the JWT keys

# 4. add a `dev.env` file following that [config scheme](./src/config/config.schema.ts)

# 5. `npm install` + `npm run start:dev`