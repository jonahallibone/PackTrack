const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp()

exports.widgets = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const body = {
      UPSSecurity: {
        UsernameToken: {
          Username: 'JonahAllibone-de',
          Password: 'Admin1234!'
        },
        ServiceAccessToken: {
          AccessLicenseNumber: '3D72247F75B343D5'
        }
      },
      TrackRequest: {
        Request: {
          RequestOption: '1',
          TransactionReference: {
            CustomerContext: 'Get packages for Jonah'
          }
        },
        InquiryNumber: '1Z9YA7830301245846'
      }
    };

    try {
      const status = await fetch('https://wwwcie.ups.com/rest/Track', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await status.json()

      console.log(response);

      return res.json(response);
    } catch (error) {
      return res.send(error);
    }
  });
});