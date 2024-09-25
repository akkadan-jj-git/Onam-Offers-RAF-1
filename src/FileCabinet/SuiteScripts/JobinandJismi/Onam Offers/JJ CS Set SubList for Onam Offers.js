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

        let subsidiary = rec.getValue({fieldId: 'custpage_subsidiary'}) || '';
        let name = rec.getValue({fieldId: 'custpage_customer'}) || '';
        if(scriptContext.fieldId === 'custpage_subsidiary' || scriptContext.fieldId === 'custpage_customer'){
            document.location = url.resolveScript({
                deploymentId: 'customdeploy_jj_sl_onameofferspage',
                scriptId: 'customscript_jj_sl_onameofferspage',
                params: {
                    subsidiaryValue: subsidiary || '',
                    customerName: name || ''
                }
            })
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
    };
    
});
