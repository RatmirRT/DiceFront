export const url = 'https://inkshoptest.shop/';
export async function fetchRequest(Url, data, token) {
    let header = (!token)?{'Content-Type': 'application/json'}:
        {'Content-Type': 'application/json',
            'Authorization': token };
    try {
        let response = await fetch(url + 'api' + Url, {
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

