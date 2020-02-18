import { getSample } from '../../services/sampleService/getSample';
module.exports = {
    getSampleCall
};

async function getSampleCall(req, res) {
    const data = await getSample(req);
    res.status(200).send(data);
}