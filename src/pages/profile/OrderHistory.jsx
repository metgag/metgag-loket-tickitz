function OrderHistory() {
  return (
    <section className="flex flex-col">
      <div className="history-wrapper gap-5 flex flex-col">
        <div className="history history-1 rounded-2xl bg-white">
          <div
            className="history-a flex p-[1.5rem_2rem border-b border-[#DEDEDE] justify-between items-center">
            <div className="date-title flex flex-col gap-2">
              <p className="text-[#AAAAAA] text-sm">Tuesday, 07 July 2020 - 04:30pm</p>
              <h3 className="font-semibold">Spider-Man: Homecoming</h3>
            </div>
            <img className="w-28" src="/sponsor/cine.svg" alt="" />
          </div>
          <div className="history-b flex p-[1.5rem_2rem] justify-between">
            <div className="btn flex gap-[.75rem]">
              <button disabled>Ticket in active</button>
              <button disabled>Not Paid</button>
            </div>
            <p className="text-[#AAAAAA] flex gap-3.5 items-center">
              Show Details <i className="nf nf-cod-chevron_up"></i>
            </p>
          </div>
          <div className="paym-info flex flex-col">
            <h3 className="fw-md">Ticket Information</h3>
            <div className="no-rek flex align-center">
              <p>No. Rekening Virtual</p>
              <div className="side flex align-center">
                <p>12321328913829724</p>
                <button>Copy</button>
              </div>
            </div>
            <div className="total flex">
              <p>Total Payment</p>
              <h4>$30</h4>
            </div>
            <p>Pay this payment bill before it is due, <span>on June
              23,
              2023</span>. If the bill has not been paid by
              the specified
              time, it will be forfeited</p>
            <button>Cek Pembayaran</button>
          </div>
        </div>
        <div className="history history-2">
          <div className="history-a flex">
            <div className="date-title flex flex-col">
              <p>Monday, 14 June 2020 - 02:00pm</p>
              <h3>Avengers: End Game</h3>
            </div>
            <img src="/assets/images/sponsor/ebv.png" alt="" />
          </div>
          <div className="history-b flex">
            <div className="btn">
              <button disabled>Ticket Used</button>
              <button disabled>Paid</button>
            </div>
            <a href="profile-ticket-history.html">Show Details <i
              className="nf nf-cod-chevron_down"></i></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderHistory
