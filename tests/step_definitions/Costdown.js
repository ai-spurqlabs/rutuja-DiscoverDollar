import { When, Then } from "@cucumber/cucumber";

When(
  "enters1 {string} {string} {string} {string}",
  async function (dealtype, banner, Audityear, Auditpd) {
    await this.costdown.enterform1(dealtype, banner, Audityear, Auditpd);
  }
);

When(
  "enters2 {string} {string} {string} {string} {string}",
  async function (venname, pplsoft, legacy, cbmid, cbmname) {
    await this.costdown.enterform2(venname, pplsoft, legacy, cbmid, cbmname);
  }
);

When(
  "enters3 {string} {string} {string} {string} {string} {string} {string} {string}",
  async function (claim_type, cur, pgmname, pgmcode, vad, Dealyr, contnum, contdte) {
    await this.costdown.enterform3(
      claim_type,
      cur,
      pgmname,
      pgmcode,
      vad,
      Dealyr,
      contnum,
      contdte
    );
  }
);

When(
  "enters4 {string} {string} {string} {string} {string} {string} {string}",
  async function (Claim_Type, actual_H, billed_I, IAS, other, net, claimdesc) {
    await this.costdown.enterform4(
      Claim_Type,
      actual_H,
      billed_I,
      IAS,
      other,
      net,
      claimdesc
    );
  }
);

When(
  "enters 6 line {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string}",
  async function (
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
    await this.costdown.enters6line(
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
    );
  }
);

When(
  "enters6  {string} {string} {string} {string} {string} {string}",
  async function (claim_type, dealqty_A, flyerpg, PADstartdte, PADenddte, qty_B) {
    await this.costdown.enterline6(
      claim_type,
      dealqty_A,
      flyerpg,
      PADstartdte,
      PADenddte,
      qty_B
    );
  }
);

When(
  "enters7 {string} {string} {string} {string} {string} {string}",
  async function (claim_type, qtc_C, totalqty_A, qtyB, qtydiff, perunit_C) {
    await this.costdown.enterline7(claim_type, qtc_C, totalqty_A, qtyB, qtydiff, perunit_C);
  }
);

When(
  "enters8 {string} {string} {string} {string} {string} {string}",
  async function (claim_type, perunit_D, perunit_diff, support_E, support_F, claimamt_G) {
    await this.costdown.enterline8(
      claim_type,
      perunit_D,
      perunit_diff,
      support_E,
      support_F,
      claimamt_G
    );
  }
);

When(
  "enters5 {string} {string} {string}",
  async function (ClaimSource, GeneratedReportID, ContinuationClaim) {
    await this.costdown.enterlines5(ClaimSource, GeneratedReportID, ContinuationClaim);
  }
);
