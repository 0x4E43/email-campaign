export default function LoginCard() {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>Login to Email App</p>
          <div>
            <input type="text" placeholder="Email here" className="input input-bordered w-full max-w-xs" />
            <p className="text-small justify-end"><a href="#">Generate OTP.</a></p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
