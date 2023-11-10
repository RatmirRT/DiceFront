export async function fetchRequest(Url, data, token) {
    const url = 'https://a22039-b6f2.b.d-f.pw/api';
    let header = (!token)?{'Content-Type': 'application/json'}:
        {'Content-Type': 'application/json',
            'Authorization': token };
    try {
        let response = await fetch(url + Url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });


        const answer = await response.json();

        if (!response.ok) {
            return answer.message;
        }

        return answer;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

