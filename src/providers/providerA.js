export const sendViaProviderA = async ({to, subject, body}) => {

    const success = Math.random() > 0.7;
    
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if (success) {
                console.log('Provider A : Email sent!');
                resolve('Provider A success');
            } else {
                console.warn('Provider A Failed...!');
                reject( new Error('Provider A Failed..!') );
            }
        })
    });
}
