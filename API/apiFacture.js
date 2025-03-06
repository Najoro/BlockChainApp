export const fetchFactures = async (API_URL) => {

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.ds_F55INV.output;
    } catch (error) {
        console.error("Erreur API Factures: ", error);
        return [];
    }
};

