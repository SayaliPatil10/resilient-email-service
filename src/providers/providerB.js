export const sendViaProviderB = async ({to, subject, body}) => {

    const success = Math.random() > 0.7;
    
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if (success) {
                console.log('Provider B : Email sent!');
                resolve('Provider B success');
            } else {
                console.warn('Provider B Failed...!');
                reject( new Error('Provider B Failed..!') );
            }
        })
    });
}
