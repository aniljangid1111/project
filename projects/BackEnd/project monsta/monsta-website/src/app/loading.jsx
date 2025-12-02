import '../app/loading.css';

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
     
      <main className="loading">
        <div className="box">

        </div>
       <div className='loadingtext'> ...Loading</div>
      </main>
    </div>
  );
}
