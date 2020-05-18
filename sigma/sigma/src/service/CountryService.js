import axios from 'axios';

export class CountryService {

    getCountries(_this) {
        return axios.get('assets/demo/data/countries.json')
            .then(res => res.data.data)
            .then(data => {
                _this.setState({ countriesData: data });
                return data;
            });
    }
}