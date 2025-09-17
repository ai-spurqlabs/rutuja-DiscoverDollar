import fs from 'fs'
import path from 'path'
import CSS from "../fixtures/Css.json" with { type: "json" };

class ManualClaimPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('ManualClaimPage: globalThis.page is not available');
    }
  }

  async newmanualclaim(dataTable) {
    const claimdetails = dataTable.hashes()
    for (const claimDetails of claimdetails) {
      const field = claimDetails.Field
      const value = claimDetails.Value
      if (field == 'Claim Batch') {
        await this.page.locator(CSS.claimBatch).fill(value)
      } else if (field == 'CBM Number') {
        await this.page.locator(CSS.CBMNumber).fill(value)
      } else if (field == 'Vendor Number') {
        await this.page.locator(CSS.venderNumber).fill(value)
      } else if (field == 'Claim code') {
        await this.page.locator(CSS.claimCode).fill(value)
      } else if (field == 'Adj Date') {
        await this.page.locator(CSS.adjDate).fill(value)
        await this.page.locator(CSS.EffectiveDate).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.EffectiveDate).fill('07/02/2023')
      } else if (field == 'CTC product') {
        await this.page.locator(CSS.CTCProduct).fill(value)
      } else if (field == 'Sub Total') {
        await this.page.locator(CSS.SubTotal).fill(value)
        await this.page.locator(CSS.ExceptionsCBM).click()
      } else if (field == 'Peoplesoft') {
        await this.page.locator(CSS.SA_Peoplesoft).fill(value)
      } else if (field == 'Claim Amount') {
        await this.page.locator(CSS.ClaimAmount).fill(value)
        await this.page.locator(CSS.ExRate).click()
      } else if (field == 'Legacy Vendor ID') {
        await this.page.locator(CSS.pricing_legacyVID).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_legacyVID).fill(value)
      } else if (field == 'Peoplesoft ID' || field == 'Peoplesoft ID1') {
        await this.page.locator(CSS.pricing_PeoplesoftID).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_PeoplesoftID).fill(value)
      } else if (field == 'CBM ID') {
        await this.page.locator(CSS.pricing_cbmID).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_cbmID).fill(value)
      } else if (field == 'NET AMOUNT') {
        await this.page.locator(CSS.pricing_NetAmount).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_NetAmount).fill(value)
        await this.page.locator(CSS.pricing_ClaimDescription).click()
      } else if (field == 'SKU') {
        await this.page.locator(CSS.pricing_SKU).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_SKU).fill(value)
      } else if (field == 'PO_SKU' || field == 'PO_SKU1') {
        await this.page.locator(CSS.pricing_PO_SKU).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_PO_SKU).fill(value)
      } else if (field == 'PO_NUMBR') {
        await this.page.locator(CSS.pricing_PO_No).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_PO_No).fill(value)
      } else if (field == 'COST DIFF') {
        await this.page.locator(CSS.pricing_CostDiff).scrollIntoViewIfNeeded()
        await this.page.locator(CSS.pricing_CostDiff).fill(value)
        await this.page.locator(CSS.pricing_Tax).click()
      }
      await this.page.waitForTimeout(3000)
      const errCount = await this.page.locator(CSS.errmsg).count()
      if (errCount > 0) {
        const last = this.page.locator(CSS.errmsg).nth(errCount - 1)
        const text = (await last.textContent()) || ''
        if (text.trim() !== (claimDetails.Errormsg || '').trim()) {
          throw new Error(`Expected error message '${claimDetails.Errormsg}' but found '${text.trim()}'`)
        }
      }
    }
  }

  async ManualPricingClaim() {
    await this.page.locator(CSS.AddClaim_button).click()
    await this.page.waitForTimeout(1000)
    await this.page.locator(CSS.Claims_button).click()
    await this.page.waitForTimeout(1000)
  }

  async SelectClaimType(claimtype) {
    await this.page.locator(CSS.Claimtype_dropdown).click()
    await this.page.locator(`:text("${claimtype}")`).click()
    await this.page.waitForTimeout(2000)
    // suppress page errors similar to Cypress uncaught:exception
    this.page.on('pageerror', () => {})
  }

  async EnterFormDetails(form) {
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    await this.page.locator(CSS.Pricing_Banner_dropdown).click()
    await this.page.locator(`:text("${this.data.Banner}")`).click()
    await this.page.locator(CSS.Pricing_AuditPeriod_dropdown).click()
    await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
    await this.page.locator(CSS.Pricing_AuditYear_dropdown).click()
    await this.page.waitForTimeout(3000)
    await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).scrollIntoViewIfNeeded()
    await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).click()
    await this.page.locator(CSS.pricing_legacyVID).type(this.data.LegacyVendorID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
    await this.page.locator(CSS.pricing_PeoplesoftID).type(this.data.PeoplesoftID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.Pricing_ProgramCode_dropdown).click()
    await this.page.locator(`:text("${this.data.ProgramCode}")`).click()
    await this.page.locator(CSS.pricing_cbmID).type(this.data.CbmID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_cbmName).type(this.data.CbmName)
    await this.page.locator(CSS.Pricing_VAD_dropdown).click()
    await this.page.locator(`:text("${this.data.VADPrefix}")`).click()
    await this.page.locator(CSS.Pricing_Currency_dropdown).click()
    await this.page.locator(`:text("${this.data.Currency}")`).click()
    await this.page.locator(CSS.ClaimSource).type(this.data.ClaimSource)
    await this.page.locator(CSS.GeneratedReportID).type(this.data.GeneratedReportID)
    await this.page.locator(CSS.DuplicatePaymentDropdown).nth(6).click()
    await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
    await this.page.locator(CSS.pricing_GrossAmount).type(this.data.GrossAmount)
    await this.page.locator(CSS.pricing_NetAmount).type(this.data.NetAmount)
    await this.page.locator(CSS.pricing_ClaimDescription).type(this.data.ClaimDescription)
    await this.page.locator(CSS.pricing_TypeOfClaim).type(this.data.TypeOfClaim)
    const SKU = this.data.SKU + Math.floor(Math.random() * 90 + 10)
    const PO_No = this.data.PO_No + Math.floor(Math.random() * 90 + 10)
    const PO_SKU = '' + PO_No + SKU
    await this.page.locator(CSS.pricing_SKU).type(SKU.toString())
    await this.page.locator(CSS.pricing_RFXNo).type(this.data.RFXNo + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_PO_SKU).type(PO_SKU)
    await this.page.locator(CSS.pricing_PO_No).type(PO_No.toString())
    await this.page.locator(CSS.pricing_TaxCom).type(this.data.TaxCom)
    await this.page.locator(CSS.pricing_DivNam).type(this.data.DivNam)
    await this.page.locator(CSS.pricing_POCreateDte).nth(0).fill(this.data.POCreateDte)
    await this.page.locator(CSS.pricing_POReqShpDte).nth(1).fill(this.data.POReqShpDte)
    await this.page.locator(CSS.pricing_FirstInstDte).nth(2).fill(this.data.FirstInstDte)
    await this.page.locator(CSS.pricing_SumInvUnits).type(this.data.SumInvUnits)
    await this.page.locator(CSS.pricing_PaidCost).type(this.data.PaidCost)
    await this.page.locator(CSS.pricing_QuoteCost).type(this.data.QuoteCost)
    await this.page.locator(CSS.pricing_CostDiff).type(this.data.CostDiff)
    await this.page.locator(CSS.pricing_Tax).type(this.data.Tax)
    await this.page.locator(CSS.pricing_DebitNoteDte).nth(3).fill(this.data.DebitNoteDte)
    await this.page.locator(CSS.pricing_InvNo).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_InvNo).type(this.data.InvNo)
    await this.page.locator(CSS.pricing_PMTRef).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_PMTRef).type(this.data.PMTRef)
    await this.page.locator(CSS.pricing_PaidCurrency).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_PaidCurrency).type(this.data.PaidCurrency)
    await this.page.locator(CSS.pricing_ContactName).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_ContactName).type(this.data.ContactName)
    await this.page.locator(CSS.pricing_Phone).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_Phone).type(this.data.Phone)
    await this.page.locator(CSS.pricing_RefNo).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_RefNo).type(this.data.RefNo + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_QuoteCostEffDte).nth(4).fill(this.data.QuoteCostEffDte)
    await this.page.locator(CSS.pricing_ActualShpDte).nth(5).fill(this.data.ActualShpDte)
    await this.page.locator(CSS.pricing_InvDte).nth(6).fill(this.data.InvDte)
    await this.page.locator(CSS.pricing_RFXTitle).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_RFXTitle).type(this.data.RFXTitle)
    await this.page.locator(CSS.pricing_ProductDesc).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_ProductDesc).type(this.data.ProductDesc)
    await this.page.locator(CSS.pricing_VendorPartNo).scrollIntoViewIfNeeded()
    await this.page.locator(CSS.pricing_VendorPartNo).type(this.data.VendorPartNo)
    await this.page.locator(CSS.pricing_ReceiptDte).nth(7).fill(this.data.ReceiptDte)
  }

  async AttachClaimSheet(filename) {
    await this.page.waitForTimeout(5000)
    const filePath = path.join(process.cwd(), 'cypress', 'fixtures', filename)
    await this.page.locator(CSS.AttachClaimsheet).setInputFiles(filePath)
    await this.page.waitForTimeout(5000)
  }

  async PreviewClaim() {
    await this.page.waitForTimeout(2000)
    await this.page.locator(':text("PREVIEW")').click()
  }

  async ClickSubmit() {
    await this.page.waitForTimeout(3000)
    const text = (await this.page.locator(CSS.ClaimNumber_field).nth(0).textContent()) || ''
    const claimTrimmed = text.trim()
    global.GenClaim = claimTrimmed
    await this.page.waitForTimeout(2000)
    await this.page.locator(CSS.Submit_btn).click()
  }

  async VerifyClaim() {
    await this.page.locator(CSS.ToDos).click()
    await this.page.locator(CSS.Review_bucket).click()
    await this.page.locator(CSS.DefaultFilter).click()
    await this.page.locator(CSS.DefaultFilter).click()
    if (await this.page.locator(CSS.DefaultFilter).isVisible()) {
      await this.page.locator(CSS.DefaultFilter).click({ force: true })
    }
    await this.page.locator(CSS.ClaimNo_filter).click()
    await this.page.waitForTimeout(2000)
    await this.page.locator(CSS.reviewClaimsearchBox).type(global.GenClaim, { delay: 50 })
    await this.page.locator(CSS.Filter_options).nth(0).click()
    await this.page.waitForTimeout(1000)
    const result = (await this.page.locator(CSS.Search_result).textContent()) || ''
    if (result.trim() !== (global.GenClaim || '').trim()) throw new Error('VerifyClaim mismatch')
    await this.page.waitForTimeout(2000)
  }

  async ClaimRequired(msg) {
    const text = (await this.page.locator(CSS.Claimsheet_req).textContent()) || ''
    if (text.trim() !== msg) throw new Error('ClaimRequired mismatch')
  }

  async EnterMandatoryFields(form) {
    await this.page.waitForTimeout(3000)
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    await this.page.locator(CSS.Pricing_Banner_dropdown).click()
    await this.page.locator(`:text("${this.data.Banner}")`).click()
    await this.page.locator(CSS.Pricing_AuditPeriod_dropdown).click()
    await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
    await this.page.locator(CSS.Pricing_AuditYear_dropdown).click()
    await this.page.locator(`:text("${this.data.AuditYear}")`).click()
    await this.page.locator(CSS.Pricing_ProgramCode_dropdown).click()
    await this.page.locator(`:text("${this.data.ProgramCode}")`).click()
    await this.page.locator(CSS.pricing_legacyVID).type(this.data.LegacyVendorID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
    await this.page.locator(CSS.pricing_PeoplesoftID).type(this.data.PeoplesoftID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_cbmID).type(this.data.CbmID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.pricing_cbmName).type(this.data.CbmName)
    await this.page.locator(CSS.Pricing_VAD_dropdown).click()
    await this.page.locator(`:text("${this.data.VADPrefix}")`).click()
    await this.page.locator(CSS.Pricing_Currency_dropdown).click()
    await this.page.locator(`:text("${this.data.Currency}")`).click()
    await this.page.locator(CSS.pricing_GrossAmount).type(this.data.GrossAmount)
    await this.page.locator(CSS.pricing_NetAmount).type(this.data.NetAmount)
    await this.page.locator(CSS.pricing_ClaimDescription).type(this.data.ClaimDescription)
    await this.page.locator(CSS.pricing_TypeOfClaim).type(this.data.TypeOfClaim)
    const SKU = this.data.SKU + Math.floor(Math.random() * 90 + 10)
    await this.page.locator(CSS.pricing_SKU).type(SKU.toString())
    const po_No = this.data.PO_No + Math.floor(Math.random() * 90 + 10)
    await this.page.locator(CSS.pricing_PO_No).type(po_No.toString())
    const po_SKU = '' + po_No + SKU
    await this.page.locator(CSS.pricing_PO_SKU).type(po_SKU)
    await this.page.locator(CSS.pricing_POCreateDte).nth(0).fill(this.data.POCreateDte)
    await this.page.locator(CSS.pricing_FirstInstDte).nth(2).fill(this.data.FirstInstDte)
    await this.page.locator(CSS.pricing_SumInvUnits).type(this.data.SumInvUnits)
    await this.page.locator(CSS.pricing_PaidCost).type(this.data.PaidCost)
    await this.page.locator(CSS.pricing_QuoteCost).type(this.data.QuoteCost)
    await this.page.locator(CSS.pricing_CostDiff).type(this.data.CostDiff)
    await this.page.locator(CSS.pricing_PaidCurrency).type(this.data.PaidCurrency)
    await this.page.locator(CSS.pricing_RefNo).type(this.data.RefNo + Math.floor(Math.random() * 90 + 10))
  }

  async ValidateErrmsg(err, pos) {
    await this.page.waitForTimeout(3000)
    const text = (await this.page.locator(CSS.errmsg).nth(pos).textContent()) || ''
    if (text.trim() !== err) throw new Error('ValidateErrmsg mismatch')
  }

  async VerifySAClaim() {
    await this.page.locator(CSS.ToDos).click()
    await this.page.locator(CSS.Review_bucket).click()
    await this.page.waitForTimeout(7000)
    await this.page.locator(CSS.DefaultFilter).click()
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.DefaultFilter).click()
    await this.page.waitForTimeout(5000)
    if (await this.page.locator(CSS.DefaultFilter).isVisible()) {
      await this.page.locator(CSS.DefaultFilter).click({ force: true })
    }
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.ClaimNo_filter).click()
    await this.page.waitForTimeout(2000)
    await this.page.locator(CSS.ClaimNO_filter_search).type(global.GenClaim, { delay: 150 })
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.Filter_options).locator(`:text("${(global.GenClaim || '').trim()}")`).click()
    const txt = (await this.page.locator(CSS.SA_Search_result).textContent()) || ''
    if (txt.trim() !== (global.GenClaim || '').trim()) throw new Error('VerifySAClaim mismatch')
  }

  async EnterMandatorySAFields(form) {
    await this.page.waitForTimeout(3000)
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    await this.page.locator(CSS.SA_AuditPeriod_dropdown).click()
    await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
    await this.page.locator(CSS.SA_Banner_dropdown).click()
    await this.page.locator(`:text("${this.data.Banner}")`).click()
    await this.page.locator(CSS.claimBatch).type(Math.floor(Math.random() * 90 + 10).toString())
    await this.page.locator(CSS.SA_Claim_Prefix_dropdown).click()
    await this.page.locator(`:text("${this.data.ClaimPrefix}")`).click()
    await this.page.locator(CSS.CBMNumber).type(this.data.CBMNumber + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.SA_CCY_dropdown).click()
    await this.page.locator(`:text("${this.data.CCY}")`).click()
    await this.page.locator(CSS.venderNumber).type(this.data.VendorNumber)
    await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
    await this.page.locator(CSS.program).type(this.data.Program)
    await this.page.locator(CSS.claimCode).type(this.data.ClaimCode)
    await this.page.locator(CSS.adjDate).fill(this.data.AdjDate)
    await this.page.locator(CSS.adjQuantity).type(this.data.AdjQuantity)
    await this.page.locator(CSS.CTCProduct).type(this.data.CTCProduct)
    await this.page.locator(CSS.POPrice).fill(this.data.POPrice)
    await this.page.locator(CSS.OrgVoucherId).type(this.data.OrgVoucherId)
    await this.page.locator(CSS.OrgInvoiceNumber).type(this.data.OrgInvoiceNumber)
    await this.page.locator(CSS.SubTotal).type(this.data.SubTotal)
    await this.page.locator(CSS.EffectiveDate).fill(this.data.EffectiveDate)
    await this.page.locator(CSS.SA_Peoplesoft).type(this.data.Peoplesoft + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.AllowanceRate).type(this.data.AllowanceRate)
    await this.page.locator(CSS.NetClaim).type(this.data.NetClaim)
    await this.page.locator(CSS.Deduction).type(this.data.Deduction)
    await this.page.locator(CSS.ClaimAmount).type(this.data.ClaimAmount)
    await this.page.locator(CSS.ExRate).type(this.data.ExRate)
    await this.page.locator(CSS.CADAmt).type(this.data.CADAmt)
    await this.page.locator(CSS.Definition).type(this.data.Definition)
    await this.page.locator(CSS.Period).type(this.data.Period)
    await this.page.locator(CSS.Comment).type(this.data.Comment)
  }

  async EnterPartialSAFields(form) {
    await this.page.waitForTimeout(3000)
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    await this.page.locator(CSS.SA_AuditPeriod_dropdown).click()
    await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
    await this.page.locator(CSS.SA_Banner_dropdown).click()
    await this.page.locator(`:text("${this.data.Banner}")`).click()
    await this.page.locator(CSS.claimBatch).type(Math.floor(Math.random() * 90 + 10).toString())
    await this.page.locator(CSS.SA_Claim_Prefix_dropdown).click()
    await this.page.locator(`:text("${this.data.ClaimPrefix}")`).click()
    await this.page.locator(CSS.SA_CCY_dropdown).click()
    await this.page.locator(`:text("${this.data.CCY}")`).click()
    await this.page.locator(CSS.venderNumber).type(this.data.VendorNumber)
    await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
    await this.page.locator(CSS.SA_Year_dropdown).click()
    await this.page.locator(`:text("${this.data.Year}")`).click()
    await this.page.locator(CSS.program).type(this.data.Program)
    await this.page.locator(CSS.claimCode).type(this.data.ClaimCode)
    await this.page.locator(CSS.totalAdjustment).type(this.data.TotalAdjustment)
    await this.page.locator(CSS.PO_Number).type(this.data.PONumber)
    await this.page.locator(CSS.paymentRefNumber).type(this.data.PaymentRefNumber)
    await this.page.locator(CSS.paymentDate).fill(this.data.PaymentDate)
    await this.page.locator(CSS.adjQuantity).type(this.data.AdjQuantity)
    await this.page.locator(CSS.CTCProduct).type(this.data.CTCProduct)
    await this.page.locator(CSS.POPrice).type(this.data.POPrice)
    await this.page.locator(CSS.OrgVoucherId).type(this.data.OrgVoucherId)
    await this.page.locator(CSS.OrgInvoiceNumber).type(this.data.OrgInvoiceNumber)
    await this.page.locator(CSS.SubTotal).type(this.data.SubTotal)
    await this.page.locator(CSS.ExceptionsCBM).type(this.data.ExceptionsCBM)
    await this.page.locator(CSS.ExceptionsSKU).type(this.data.ExceptionsSKU)
    await this.page.locator(CSS.EffectiveDate).fill(this.data.EffectiveDate)
    await this.page.locator(CSS.SA_Peoplesoft).type(this.data.Peoplesoft + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.AllowanceRate).type(this.data.AllowanceRate)
    await this.page.locator(CSS.NetClaim).type(this.data.NetClaim)
    await this.page.locator(CSS.Deduction).type(this.data.Deduction)
    await this.page.locator(CSS.ClaimAmount).type(this.data.ClaimAmount)
    await this.page.locator(CSS.ExRate).type(this.data.ExRate)
    await this.page.locator(CSS.CADAmt).type(this.data.CADAmt)
    await this.page.locator(CSS.Definition).type(this.data.Definition)
    await this.page.locator(CSS.Period).type(this.data.Period)
  }

  async VerifyFormValidationError(mesg) {
    await this.page.waitForTimeout(3000)
    const text = (await this.page.locator(CSS.Form_validation_error).textContent()) || ''
    if (text.trim() !== mesg) throw new Error('VerifyFormValidationError mismatch')
  }

  async PDFiconPresent() {
    if (!(await this.page.locator(CSS.PDF_icon).isVisible())) throw new Error('PDF icon not present')
  }

  async clickCheckBox() {
    await this.page.locator(CSS.manualCheckBox).click()
  }

  //===================== Miscellaneous Claim Type ==========================

  async fillClaimDetails(claimtype, form) {
    await this.page.waitForTimeout(3000)
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    if (claimtype === 'Statement Audit') {
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(0).click()
      await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(1).click()
      await this.page.locator(`:text("${this.data.Banner_2}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(2).click()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).scrollIntoViewIfNeeded()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(3).click()
      await this.page.locator(`:text("${this.data.VADPrifix_2}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(4).click()
      await this.page.locator(`:text("${this.data.Currency}")`).click()
      await this.page.locator(CSS.claimBatch).type(Math.floor(Math.random() * 90 + 10).toString())
      await this.page.locator(CSS.pricing_legacyVID).type(this.data.LegacyVendorID + Math.floor(Math.random() * 90 + 10))
      const randomNum = Math.floor(Math.random() * 90 + 10)
      const peoplesoftIdClean = String(this.data.PeoplesoftID).trim()
      const peoplesoftIdValue = peoplesoftIdClean + randomNum
      await this.page.locator(CSS.Peoplesoft_ID).type(peoplesoftIdValue)
      global.PeoplesoftID = peoplesoftIdValue
      await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
      await this.page.locator(CSS.SA_Amount).type(this.data.GrossAmount)
      await this.page.locator(CSS.TotalAmount).type(this.data.NetAmount)
      await this.page.locator(CSS.pricing_ClaimDescription).type(this.data.ClaimDescription)
      await this.page.locator(CSS.Invoice_Credit_No).type(Math.floor(Math.random() * 90 + 10).toString())
      await this.page.locator(CSS.Date).fill(this.data.FirstInstDte)
      await this.page.locator(CSS.Amount_CAD).click()
      await this.page.locator(CSS.GST_HST).type(this.data.GST_HST)
      await this.page.locator(CSS.QST).type(this.data.QST)
      await this.page.locator(CSS.Amount_CAD).type(this.data.GrossAmount)
      await this.page.locator(CSS.TaxAmount).type(this.data.TaxAmount)
      await this.page.locator(CSS.ClaimSource).type(this.data.ClaimSource)
      await this.page.locator(CSS.GeneratedReportID).type(this.data.GeneratedReportID)
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(5).click()
      await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
      const locationTrimmed = String(this.data.Location).trim()
      global.LocationNo = locationTrimmed
      await this.page.locator(CSS.Location).type(global.LocationNo)
    } else if (claimtype === 'Duplicate Payments') {
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(0).click()
      await this.page.locator(`:text("${this.data.Banner_2}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(1).click()
      await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(2).click()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).scrollIntoViewIfNeeded()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(3).click()
      await this.page.locator(`:text("${this.data.VADPrifix_2}")`).click()
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(4).click()
      await this.page.locator(`:text("${this.data.Currency}")`).click()
      await this.page.locator(CSS.pricing_VendorName).type(this.data.VendorName)
      await this.page.locator(CSS.venderNumber).type(this.data.VendorNumber)
      await this.page.locator(CSS.pricing_PeoplesoftID).type(this.data.PeoplesoftID + Math.floor(Math.random() * 90 + 10))
      await this.page.locator(CSS.gross_amount).type(this.data.GrossAmount)
      await this.page.locator(CSS.pricing_NetAmount).type(this.data.NetAmount)
      await this.page.locator(CSS.pricing_ClaimDescription).type(this.data.ClaimDescription)
      await this.page.locator(CSS.DP_TaxAmount).fill(this.data.TaxAmount)
      await this.page.locator(CSS.ClaimSource).type(this.data.ClaimSource)
      await this.page.locator(CSS.GeneratedReportID).type(this.data.GeneratedReportID)
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(5).click()
      await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
      await this.page.locator(CSS.Location).type(this.data.Location)
    } else if (claimtype === 'Miscellaneous or Others') {
      await this.page.locator(CSS.com_CSS).nth(0).click()
      await this.page.locator(':text("CTR")').click()
      await this.page.locator(CSS.com_CSS).nth(0).click()
      await this.page.locator(CSS.com_CSS).nth(1).fill(claimtype)
      await this.page.locator(CSS.com_CSS).nth(1).click()
      await this.page.locator(CSS.com_CSS).nth(2).click()
      await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
      await this.page.locator(CSS.com_CSS).nth(3).click()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).scrollIntoViewIfNeeded()
      await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).click()
      await this.page.locator(CSS.com_CSS).nth(3).click()
      await this.page.locator(CSS.com_CSS).nth(4).type(this.data.VendorName)
      await this.page.locator(CSS.com_CSS).nth(5).type(this.data.VendorNumber + Math.floor(Math.random() * 90 + 10))
      await this.page.locator(CSS.com_CSS).nth(6).type(this.data.PeoplesoftID + Math.floor(Math.random() * 90 + 10))
      await this.page.locator(CSS.com_CSS).nth(7).type(this.data.Miscell_VAD)
      await this.page.waitForTimeout(2000)
      await this.page.locator(CSS.com_CSS).nth(8).click()
      await this.page.locator(`:text("${this.data.Currency}")`).click()
      await this.page.locator(CSS.com_CSS).nth(8).click()
      await this.page.locator(CSS.com_CSS).nth(9).type(this.data.GrossAmount)
      await this.page.locator(CSS.com_CSS).nth(11).type(this.data.NetAmount)
      await this.page.locator(CSS.com_CSS).nth(12).type(this.data.ClaimDescription)
      await this.page.locator(CSS.com_CSS).nth(13).type(this.data.CbmID + Math.floor(Math.random() * 90 + 10))
      await this.page.locator(CSS.com_CSS).nth(14).type(this.data.CbmName)
      await this.page.locator(CSS.com_CSS).nth(17).fill(this.data.TaxAmount)
      await this.page.locator(CSS.ClaimSource).type(this.data.ClaimSource)
      await this.page.locator(CSS.GeneratedReportID).type(this.data.GeneratedReportID)
      await this.page.locator(CSS.DuplicatePaymentDropdown).nth(6).click()
      await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
      await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
      await this.page.locator(CSS.Location).type(this.data.Location)
    }
  }

  async MiscellaneousFormDetails(banner, claimType, form) {
    await this.page.waitForTimeout(3000)
    const formPath = path.join(process.cwd(), 'cypress', 'fixtures', form)
    const data = JSON.parse(fs.readFileSync(formPath, 'utf8'))
    this.data = data
    await this.page.locator(CSS.com_CSS).nth(0).click()
    await this.page.locator(`:text("${banner}")`).click()
    await this.page.locator(CSS.com_CSS).nth(0).click()
    await this.page.locator(CSS.com_CSS).nth(1).fill(claimType)
    await this.page.locator(CSS.com_CSS).nth(1).click()
    await this.page.locator(CSS.com_CSS).nth(2).click()
    await this.page.locator(`:text("${this.data.AuditPeriod}")`).click()
    await this.page.locator(CSS.com_CSS).nth(3).click()
    await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).scrollIntoViewIfNeeded()
    await this.page.locator(`${CSS.search_item}:text("${this.data.AuditYear}")`).click()
    await this.page.locator(CSS.com_CSS).nth(3).click()
    await this.page.locator(CSS.com_CSS).nth(4).type(this.data.VendorName)
    await this.page.locator(CSS.com_CSS).nth(5).type(this.data.VendorNumber + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.com_CSS).nth(6).type(this.data.PeoplesoftID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.com_CSS).nth(7).type(this.data.Miscell_VAD)
    await this.page.waitForTimeout(2000)
    await this.page.locator(CSS.com_CSS).nth(8).click()
    await this.page.locator(`:text("${this.data.Currency}")`).click()
    await this.page.locator(CSS.com_CSS).nth(8).click()
    await this.page.locator(CSS.com_CSS).nth(9).type(this.data.GrossAmount)
    await this.page.locator(CSS.com_CSS).nth(11).type(this.data.NetAmount)
    await this.page.locator(CSS.com_CSS).nth(12).type(this.data.ClaimDescription)
    await this.page.locator(CSS.com_CSS).nth(13).type(this.data.CbmID + Math.floor(Math.random() * 90 + 10))
    await this.page.locator(CSS.com_CSS).nth(14).type(this.data.CbmName)
    await this.page.locator(CSS.com_CSS).nth(17).fill(this.data.TaxAmount)
    await this.page.locator(CSS.ClaimSource).type(this.data.ClaimSource)
    await this.page.locator(CSS.GeneratedReportID).type(this.data.GeneratedReportID)
    await this.page.locator(CSS.DuplicatePaymentDropdown).nth(6).click()
    await this.page.locator(`:text("${this.data.ContinuationClaim}")`).click()
    await this.page.locator(CSS.Location).type(this.data.Location)
  }
}

export default ManualClaimPage
