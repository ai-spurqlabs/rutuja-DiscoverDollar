import CSS from "../fixtures/Css.json" with { type: "json" };

class Costdownpage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('Costdownpage: globalThis.page is not available');
    }
  }

  async select_claimtype(claim_type) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.select_filetype).selectOption({ value: claim_type });
    // verify value
    const val = await this.page.locator(CSS.select_filetype).inputValue();
    if (val !== claim_type) throw new Error('select_claimtype value mismatch');
  }

  async enterform1(dealtype, banner, Audityear, Auditpd) {
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.DealType).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(CSS.DealTypeList).filter({ hasText: dealtype }).click();

    await this.page.locator(CSS.Banner).click();
    await this.page.locator(`:text("${banner}")`).click();

    await this.page.locator(CSS.AuditYear).click();
    await this.page.locator(`:text("${Audityear}")`).click();

    await this.page.locator(CSS.AuditPeriod).click();
    await this.page.locator(CSS.DealTypeList).filter({ hasText: Auditpd }).click();
  }

  async enterform2(venname, pplsoft, legacy, cbmid, cbmname) {
    await this.page.locator(CSS.VendorName).fill(venname);
    await this.page.locator(CSS.PeopleSoftId).fill(pplsoft);
    await this.page.locator(CSS.LegacyName).fill(legacy);
    await this.page.locator(CSS.CBM_Id).fill(cbmid);
    await this.page.locator(CSS.CBM_Name).fill(cbmname);
  }

  async enterform3(claim_type, cur, pgmname, pgmcode, vad, Dealyr, contnum, contdte) {
    await this.page.locator(CSS.Currency).click();
    await this.page.locator(`:text("${cur}")`).click();

    await this.page.locator(CSS.ProgramName).click();
    await this.page.locator(`:text("${pgmname}")`).click();

    await this.page.locator(CSS.ProgramCode).click();
    await this.page.locator(`:text("${pgmcode}")`).click();

    await this.page.locator(CSS.Vad_Name).click();
    await this.page.locator(`:text("${vad}")`).click();

    await this.page.locator(CSS.DealYear).click();
    await this.page.locator(CSS.DealYearSuggestion).click();
    if (claim_type === "Costdown Margin O and A") {
      await this.page.locator(CSS.ContractNumber).fill(contnum);
      await this.page.waitForTimeout(5000);
      await this.page.locator(CSS.CalenderIcon).click();
      await this.page.waitForTimeout(5000);
      await this.page.locator(`xpath=${CSS.StartDateLine5}`).fill(contdte);
    }
  }

  async enterform4(
    Claim_Type,
    actual_H,
    billed_I,
    IAS_J,
    other_K,
    net_HIJK,
    claimdesc
  ) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ActualH_form4).fill(actual_H);
    await this.page.locator(CSS.BilledI_form4).fill(billed_I);

    if (Claim_Type === "Costdown Margin O and A or Promo Deal") {
      // console.log(Claim_Type)
      await this.page.locator(CSS.IasJ_PAD).fill(IAS_J);
      await this.page.locator(CSS.OtherK_PAD).fill(other_K);
      await this.page.locator(CSS.NetHijk_PAD).fill(net_HIJK);
      await this.page.waitForTimeout(5000);
      await this.page.locator(CSS.ClaimDes_form4).fill(claimdesc);
    } else if (
      Claim_Type === "Costdown PAD Deal" ||
      Claim_Type === "Costdown Promo Deal" ||
      Claim_Type === "Costdown Promo and PAD Deal"
    ) {
      await this.page.locator(CSS.IasJ_PAD).fill(IAS_J);
      await this.page.locator(CSS.OtherK_PAD).fill(other_K);
      await this.page.locator(CSS.NetHijk_PAD).fill(net_HIJK);
      await this.page.locator(CSS.claimDesc_PAD).fill(claimdesc);
    } else if (Claim_Type === "Costdown Placing Deal") {
      await this.page.locator(CSS.OtherK_Placing).fill(other_K);
      await this.page.locator(CSS.NetHIJKPlacing).fill(net_HIJK);
      await this.page.locator(CSS.ClaimDescPlacing).fill(claimdesc);
    }
  }

  async enters6line(
    dealnum,
    prod,
    proddesc,
    startdte,
    enddte,
    dealqty_A,
    totalqty_A,
    qtyB,
    qtydiff,
    perunit_C,
    billed_D,
    difference_CD,
    total_AC_E,
    billed_BD_F,
    claimAmt_EF_G,
    postCD,
    VADclaim,
    netAmt
  ) {
    await this.page.locator(CSS.DealLine5).fill(dealnum);
    await this.page.locator(CSS.ProdLine5).fill(prod);
    await this.page.locator(CSS.ProdDescLine5).fill(proddesc);
    await this.page.locator(`xpath=${CSS.StartDateLine5}`).fill(startdte);
    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.EndDateLine5}`).fill(enddte);
    await this.page.locator(CSS.DealQtyLine6).fill(dealqty_A);
    await this.page.locator(CSS.QtyA_PromoLine7).fill(totalqty_A);
    await this.page.locator(CSS.QtyB_PromoLine7).fill(qtyB);
    await this.page.locator(CSS.DtyDiff_PromoLine7).fill(qtydiff);
    await this.page.locator(CSS.PerUnitC_PromoLine7).fill(perunit_C);
    await this.page.locator(CSS.BilledCostPromoLine7).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.BilledCostPromoLine7).fill(billed_D);
    await this.page.locator(CSS.difference_CD).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.difference_CD).fill(difference_CD);
    await this.page.locator(CSS.total_AC_E).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.total_AC_E).fill(total_AC_E);
    await this.page.locator(CSS.billed_BD_F).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.billed_BD_F).fill(billed_BD_F);
    await this.page.locator(CSS.claimAmt_EF_G).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.claimAmt_EF_G).fill(claimAmt_EF_G);
    await this.page.locator(CSS.postCD).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.postCD).fill(postCD);
    await this.page.locator(CSS.VADclaim).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.VADclaim).fill(VADclaim);
    await this.page.locator(CSS.netAmt).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.netAmt).fill(netAmt);
  }

  async enterline7(claim_type, qtc_C, totalqty_A, qtyB, qtydiff, perunit_C) {
    if (claim_type === "Costdown PAD Deal") {
      await this.page.waitForTimeout(5000);
      await this.page.locator(`xpath=${CSS.TotalQtyALine7}`).focus();
      await this.page.locator(`xpath=${CSS.TotalQtyALine7}`).type(totalqty_A);
      await this.page.locator(CSS.QtyB_PADLine7).fill(qtyB);
      await this.page.locator(CSS.QtyDiff_PADLine7).fill(qtydiff);
      await this.page.locator(CSS.PerUnitC_PADLine7).fill(perunit_C);
    } else if (claim_type === "Costdown Promo Deal") {
      await this.page.locator(CSS.QtyA_PromoLine7).fill(totalqty_A);
      await this.page.locator(CSS.QtyB_PromoLine7).fill(qtyB);
      await this.page.locator(CSS.DtyDiff_PromoLine7).fill(qtydiff);
      await this.page.locator(CSS.PerUnitC_PromoLine7).fill(perunit_C);
      await this.page.locator(CSS.BilledCostPromoLine7).scrollIntoViewIfNeeded();
      // visibility checks are left out; test can assert separately
    } else if (claim_type === "Costdown Promo and PAD Deal") {
      await this.page.locator(CSS.QtyCPromoPad).fill(qtc_C);
      await this.page.locator(CSS.QtyAPromoPad).fill(totalqty_A);
      await this.page.locator(CSS.QtyBPromoPad).fill(qtyB);
      await this.page.locator(CSS.QtyDiffPromoPad).fill(qtydiff);
      await this.page.locator(CSS.PerUniCPromoPad).fill(perunit_C);
    } else if (claim_type === "Costdown Placing Deal") {
      await this.page.locator(CSS.QtyAPlacing).fill(totalqty_A);
      await this.page.locator(CSS.PerUnitCPlacing).fill(perunit_C);
    }
  }

  async enterline8(
    claim_type,
    perunit_D,
    perunit_diff,
    support_E,
    support_F,
    claimamt_G
  ) {
    if (claim_type === "Costdown Promo Deal") {
      await this.page.locator(CSS.PerUnitDPromoLine8).fill(perunit_D);
      await this.page.locator(CSS.PerUnitDiffPromoLine8).fill(perunit_diff);
      await this.page.locator(CSS.SupportEPromoLine8).fill(support_E);
      await this.page.locator(CSS.SupportFPromoLine8).fill(support_F);
      await this.page.locator(CSS.ClaimAmtGPromoLine8).fill(claimamt_G);
    } else if (claim_type === "Costdown Promo and PAD Deal") {
      await this.page.locator(CSS.PerUnitDPromoPad).fill(perunit_D);
      await this.page.locator(CSS.DiffPromoPad).fill(perunit_diff);
      await this.page.locator(CSS.SupportEPromoPad).fill(support_E);
      await this.page.locator(CSS.SupportFPromoPad).fill(support_F);
      await this.page.locator(CSS.ClaimAmtPromoPad).fill(claimamt_G);
    } else if (claim_type === "Costdown Placing Deal") {
      await this.page.locator(CSS.SupportEPlacing).fill(support_E);
    } else {
      await this.page.locator(CSS.UnitD_Line8).fill(perunit_D);
      await this.page.locator(CSS.UnitDiff_Line8).fill(perunit_diff);

      if (claim_type === "Costdown Placing Deal") {
        await this.page.locator(CSS.SupportEPlacingLine8).fill(support_E);
      } else {
        await this.page.locator(CSS.supportELine8).fill(support_E);
      }

      await this.page.locator(CSS.supportFLine8).fill(support_F);
      await this.page.locator(CSS.ClaimAmt_G_Line8).fill(claimamt_G);
    }
  }

  async enterlines5(ClaimSource, GeneratedReportID, ContinuationClaim) {
    await this.page.locator(CSS.ClaimSource).fill(ClaimSource);
    await this.page.locator(CSS.GeneratedReportID).fill(GeneratedReportID);

    await this.page.locator(CSS.DuplicatePaymentDropdown).filter({ hasText: CSS.ContinuationClaimText }).click();
    await this.page.locator(CSS.Pricing_select_option).filter({ hasText: ContinuationClaim }).scrollIntoViewIfNeeded().click();
  }
}
export default Costdownpage;
