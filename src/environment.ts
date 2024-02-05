export interface EnvironmentVariables {
  API_URL: string;
}

const environment: EnvironmentVariables = {
  API_URL: process.env.REACT_APP_API_URL!,
};

export default environment;
