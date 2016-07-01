# insurance-store-front

[![Build Status](https://travis-ci.org/IBM-Bluemix/insurance-store-front.svg?branch=master)](https://travis-ci.org/IBM-Bluemix/insurance-store-front)

A Node.js app that serves as the front end for the insurance microservices demo. Utilizes the [Catalog API][catalog_url] and [Orders API][orders_url] in the back end.

In order to deploy the full set of microservices involved in the insurance demo, check out the [insurance-toolchain repo][toolchain_url]. Otherwise, you can deploy just this app with the following button



[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)

## Running the app on Bluemix

1. If you do not already have a Bluemix account, [sign up here][bluemix_reg_url]

2. Download and install the [Cloud Foundry CLI][cloud_foundry_url] tool

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/insurance-store-front.git
  ```

4. `cd` into this newly created directory

5. Open the `manifest.yml` file and change the `host` value to something unique.

  The host you choose will determinate the subdomain of your application's URL:  `<host>.mybluemix.net`

6. Connect to Bluemix in the command line tool and follow the prompts to log in

  ```
  $ cf login -a https://api.ng.bluemix.net
  ```

7. Push the app to Bluemix.

  ```
  $ cf push
  ```

And voila! You now have your very own instance of the Insurance Store Front running on Bluemix.

## Run the app locally

1. If you have not already, [download Node.js][download_node_url] and install it on your local machine.

2. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/insurance-store-front.git
  ```

3. `cd` into this newly created directory

4. Install the required npm and bower packages using the following command

  ```
  sudo npm install --unsafe-perm
  ```

7. Start your app locally with the following command

  ```
  npm start
  ```

This command will start your Node.js web server and print the address where it is listening to the console: `server starting on http://localhost:6034`.

## Contribute
If you find a bug, please report it via the [Issues section][issues_url] or even better, fork the project and submit a pull request with your fix! We are more than happy to accept external contributions to this project if they address something noted in an existing issue.  In order to be considered, pull requests must pass the initial [Travis CI][travis_url] build and/or add substantial value to the sample application.

## Troubleshooting

The primary source of debugging information for your Bluemix app is the logs. To see them, run the following command using the Cloud Foundry CLI:

  ```
  $ cf logs insurance-store-front --recent
  ```
For more detailed information on troubleshooting your application, see the [Troubleshooting section](https://www.ng.bluemix.net/docs/troubleshoot/tr.html) in the Bluemix documentation.

## License

See [License.txt](License.txt) for license information.

<!--Links-->
[catalog_url]: https://github.com/IBM-Bluemix/insurance-catalog
[orders_url]: https://github.com/IBM-Bluemix/insurance-orders
[toolchain_url]: https://github.com/IBM-Bluemix/insurance-toolchain
[bluemix_reg_url]: http://ibm.biz/insurance-store-registration
[cloud_foundry_url]: https://github.com/cloudfoundry/cli
[download_node_url]: https://nodejs.org/download/
[issues_url]: https://github.com/ibm-bluemix/insurance-store-front/issues
[travis_url]: https://travis-ci.org/