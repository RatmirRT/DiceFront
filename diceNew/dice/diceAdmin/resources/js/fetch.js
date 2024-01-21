export async function fetchRequest(Url, data, token) {
    const url = 'https://a22988-3fca.a.d-f.pw/api';
    let header = (!token)?{'Content-Type': 'application/json'}:
        {'Content-Type': 'application/json',
            'Authorization': token };
    try {
        let response = await fetch(url + Url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return false;
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.text();
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

