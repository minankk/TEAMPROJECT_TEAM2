/**
 * This section will format the default date (yyyy/mm/dd) to the specified date (dd/mm/yyyy)
 * 
 */
const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return formattedDate;
};

module.exports = formatDate;