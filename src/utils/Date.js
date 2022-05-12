export const getFormattedDate=(date)=>{

    const d = new Date(date);
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}