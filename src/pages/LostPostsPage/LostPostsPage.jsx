import * as usersService from '../../utilities/users-service'

export default function LostPostsPage() {

    async function handleCheckToken() {
        const expDate = await usersService.checkToken()
        console.log(expDate)
    }

    return (
        <>
            <h1>LostPetsPage</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
        
    );
  }
  