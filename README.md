# TripShare UI

This is the front-end UI application for TripShare. It is written using [React](https://reactjs.org/).

## Running Locally

To run TripShare UI locally, please have [npm](https://docs.npmjs.com/about-npm) installed on your machine. Once installed, execute the following commands:

```bash
npm install
npm start
```

TripShare UI is dependent on [TripShare API](https://github.com/Mark-Donohue/tripshare-api). In order for the UI to function properly, the API must be running as well. To set up and run the API locally, please follow the instructions listed in the TripShare API README file.

## Environment Variables

In order for the UI to function properly, the following environment variables must be set within a `.env` file placed within the root directory of the project.

| Variable                 | Decsription                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| REACT_APP_GOOGLE_API_KEY | Key that authenticates and allows access to Google Maps API.             |
| REACT_APP_API_URL        | The full URL, including port number, where the API is running.           |
| REACT_APP_ASSET_URL      | The full URL, including port number, where files and uploads are stored. |

## Acknowledgment

A big thank you to Maximilian Schwarzmüller and Manuel Lorenz for their instruction and MERN guide.

## License

[MIT](https://choosealicense.com/licenses/mit/)
