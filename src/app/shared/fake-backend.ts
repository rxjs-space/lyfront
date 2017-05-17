import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFac(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        const fakeUsers = [
          { username: 'longyun', password: '888', role: '3'},
          { username: 'huanbao', password: '777', role: '2'},
          { username: 'keji', password: '666', role: '1'},
        ];

        const testUser = { username: 'longyun', password: '888', firstName: 'Huanbao', lastName: 'Longyun' };


        // fake authenticate api end point
        if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
            // get parameters from post request
            const params = JSON.parse(connection.request.getBody());
            const nowTime = Math.round(Date.now() / 1000);
            let authorized = false;
            if (params.username) {
              for (const user of fakeUsers) {
                if (params.username === user.username && params.password === user.password) {
                  const token = JSON.stringify({
                    username: user.username,
                    role: user.role,
                    iat: nowTime,
                    exp: nowTime + 60 * 60 * 24
                  });
                  authorized = true;
                  connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { token } })
                  ));
                }
              }
            }

            if (!authorized) {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200 })
                ));
            }

            // check user credentials and return fake jwt token if valid
            // if (params.username === testUser.username && params.password === testUser.password) {
            //     connection.mockRespond(new Response(
            //         new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
            //     ));
            // } else {
            //     connection.mockRespond(new Response(
            //         new ResponseOptions({ status: 200 })
            //     ));
            // }
        }

        // fake users api end point
        // if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
        //     // check for fake auth token in header and return test users if valid, this security is implemented server side
        //     // in a real application
        //     if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //         connection.mockRespond(new Response(
        //             new ResponseOptions({ status: 200, body: [testUser] })
        //         ));
        //     } else {
        //         // return 401 not authorised if token is null or invalid
        //         connection.mockRespond(new Response(
        //             new ResponseOptions({ status: 401 })
        //         ));
        //     }
        // }

    });

    return new Http(backend, options);
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFac,
    deps: [MockBackend, BaseRequestOptions]
};
