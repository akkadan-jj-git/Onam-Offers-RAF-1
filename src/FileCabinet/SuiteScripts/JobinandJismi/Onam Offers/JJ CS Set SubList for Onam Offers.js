/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/url'],

function(url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        window.onbeforeunload = null;
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        let filter = scriptContext.fieldId;
        let rec = scriptContext.currentRecord;
        let page = rec.getValue({fieldId: 'custpage_pagenumber'});
        let subsidiary = rec.getValue({fieldId: 'custpage_subsidiary'}) || '';
        let name = rec.getValue({fieldId: 'custpage_customer'}) || '';
        if(scriptContext.fieldId === 'custpage_subsidiary' || scriptContext.fieldId === 'custpage_customer' || scriptContext.fieldId === 'custpage_pagenumber'){
            document.location = url.resolveScript({
                deploymentId: 'customdeployjj_sl_onamoffers_raf1',
                scriptId: 'customscriptjj_sl_onamoffers_raf1',
                params: {
                    pageIndex: page,
                    subsidiaryValue: subsidiary || '',
                    customerName: name || ''
                }
            });
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
    };
    
});
