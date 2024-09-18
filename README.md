# observability-workshop

Workshop about observability. If you want to see a couple of recordings about this one you can watch:

* [Theoretical part](https://www.youtube.com/watch?v=bpiUIZyNQ28&t=3s)
* [Hands ond workshop](https://www.youtube.com/watch?v=d8lMnkYU50o&t=1s)

## api

Test locally

```bash
npm run start:dev
```

## frontend

create .env file in the root frontend folder wit the next values

```text
REACT_APP_BACKEND_API_KEY=
REACT_APP_BACKEND_URL=https://localhost:4200/operations
```

Test locally

```bash
npm run start
```

## CDK

### Pre-conditions

You need:

- Have an amazon account.
- Be logged into the terminal you are using with your amazon account. To be able to execute the cdk commands.
- Install the amazon cdk.

### Commands

```bash
cdk bootstrap
```

```bash
cdk synth
```

```bash
cdk deploy --all 
```

Don't forget to destroy all the insfraestructure.

```bash
cdk destroy --all
```

If you need to change your aws region, you can run this command

```bash
export AWS_REGION=us-east-2
```
