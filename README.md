# Bookfinder book search app

## Development setup

```shell
# Sinatra API
$ bundle install

# Angular
$ npm install
$ npm install -g @angular/cli
```

## Angular build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag
for a production build.

## Running a development server

```shell
export GOODREADS_KEY=yourkey
export GOODREADS_SECRET=yoursecret
```

Run `bundle exec rackup config.ru -p 4567` to serve the entire app locally on port 4567. This setup will work when the
Angular app has been built for distribution, i.e. using `ng build`.

To use the Sinatra API with the live Angular development server i.e. `ng serve`, you must enable CORS, and specify the
appropriate API port within the Angular app.

## Deployment to Heroku

Set the Goodreads API environment variables in Heroku.

Run the deploy script: `./deploy.sh branch_to_deploy`. The script defaults to deploying the local branch named `master`.
