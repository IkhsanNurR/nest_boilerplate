<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


## HTTP Status Codes (NestJS `HttpStatus` Enum)

Berikut adalah daftar HTTP status codes yang tersedia dalam enum `HttpStatus` di NestJS. Anda dapat menggunakan konstanta-konstanta ini saat mengembalikan respons dari API Anda.

**1xx Informational**

* `CONTINUE = 100`
* `SWITCHING_PROTOCOLS = 101`
* `PROCESSING = 102`
* `EARLYHINTS = 103`

**2xx Successful**

* `OK = 200`
* `CREATED = 201`
* `ACCEPTED = 202`
* `NON_AUTHORITATIVE_INFORMATION = 203`
* `NO_CONTENT = 204`
* `RESET_CONTENT = 205`
* `PARTIAL_CONTENT = 206`
* `MULTI_STATUS = 207`
* `ALREADY_REPORTED = 208`
* `CONTENT_DIFFERENT = 210`

**3xx Redirection**

* `AMBIGUOUS = 300`
* `MOVED_PERMANENTLY = 301`
* `FOUND = 302`
* `SEE_OTHER = 303`
* `NOT_MODIFIED = 304`
* `TEMPORARY_REDIRECT = 307`
* `PERMANENT_REDIRECT = 308`

**4xx Client Error**

* `BAD_REQUEST = 400`
* `UNAUTHORIZED = 401`
* `PAYMENT_REQUIRED = 402`
* `FORBIDDEN = 403`
* `NOT_FOUND = 404`
* `METHOD_NOT_ALLOWED = 405`
* `NOT_ACCEPTABLE = 406`
* `PROXY_AUTHENTICATION_REQUIRED = 407`
* `REQUEST_TIMEOUT = 408`
* `CONFLICT = 409`
* `GONE = 410`
* `LENGTH_REQUIRED = 411`
* `PRECONDITION_FAILED = 412`
* `PAYLOAD_TOO_LARGE = 413`
* `URI_TOO_LONG = 414`
* `UNSUPPORTED_MEDIA_TYPE = 415`
* `REQUESTED_RANGE_NOT_SATISFIABLE = 416`
* `EXPECTATION_FAILED = 417`
* `I_AM_A_TEAPOT = 418`
* `MISDIRECTED = 421`
* `UNPROCESSABLE_ENTITY = 422`
* `LOCKED = 423`
* `FAILED_DEPENDENCY = 424`
* `PRECONDITION_REQUIRED = 428`
* `TOO_MANY_REQUESTS = 429`
* `UNRECOVERABLE_ERROR = 456`

**5xx Server Error**

* `INTERNAL_SERVER_ERROR = 500`
* `NOT_IMPLEMENTED = 501`
* `BAD_GATEWAY = 502`
* `SERVICE_UNAVAILABLE = 503`
* `GATEWAY_TIMEOUT = 504`
* `HTTP_VERSION_NOT_SUPPORTED = 505`
* `INSUFFICIENT_STORAGE = 507`
* `LOOP_DETECTED = 508`


## PRISMA ORM
* Prisma tidak bisa enum menggunakan angka, hanya bisa string

* langkah langkah menggunakan prisma
- pastikan ada schema.prisma
- jika belum maka run -> npx prisma init -> lalu ganti DATABASE_URL
- selanjutnya run -> npx prisma db pull -> untuk pull schema semua tabel di database, definisikan di schema prisma ketika mau spesifik tabel. bisa multi schema dengan menggunakan array
- jika ada error, perbaiki dlu 
- selanjutnya run -> npx prisma generate -> ini akan generate semacam models prisma
- selesai