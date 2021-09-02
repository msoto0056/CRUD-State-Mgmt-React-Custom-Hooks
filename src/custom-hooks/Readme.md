# react-crud-plus-state-management

#### React 16.8+ CRUD using axios & React Query + State Mgmt
* All you need is one line of code for each CRUD Operation and the package will use the magic provided by React Query to perform each HTTP operation using axios. React Query was created by Tanner Linsley. axios is heavily inspired by the $http service provided in Angular. Ultimately axios is an effort to provide a standalone $http-like service for use outside of Angular.*

## Getting Started 

** Follow the create-react-app instructions to get started and then**

    npx create-react-app my-app
    cd my-app/
    npm start

### Install the react-crud-plus-state-management hooks

    #### npm install react-crud-plus-state-management

#### Dependencies
##### Required Peer Dependencies

These libraries are not bundled with this package and required at runtime:

    react
    react-dom
    axios
    react-query

## State Management 

### Usage:

#### description 
* The State Managment Hooks provide a Redux like Store using React Hooks available since v16.8. There are 2 versions MakeStore and MakeStore2. both of them return an Store provider, an Store and a Dispatch function. The difference is that MakeStore2 returns a tuple [Store,Dispatch] to follow regular useReducer format and the MakeStore returns separete Store and Dispatch components to facilitate its usage in the useEffect dependency array and reduce the # of renderings.*

### MakeStore2

#### Usage:

#### _import {makeStore2} from "react-crud-plus-state-management"_

##### Then define an initialState object and a reducer function

##### Finally create a new store with the name that you want

* sample 


```javascript
...
import 
const initialState = {
count:0,
url: 'http://localhost:5000/People'
...
};
const peopleReducer = (state, action) => {
    switch (action.type) {
        case actions.FIELDS: {
        return {
            ...state,
            [action.fieldName]: action.payload,
                };,
        }
    }
    default:
    return state;
}
};
    const [
    PeopleProvider,
    usePeopleState
    ] = makeStore2(peopleReducer, initialState)

    export { PeopleProvider, usePeopleState }
```

#### and Wrap the Components that need the store in the provider

"index.js"

    ReactDOM.render(
    <React.StrictMode>
            ....
            <PeopleProvider>
            <App />
            </PeopleProvider>
            ....
    </React.StrictMode>,
    document.getElementById('root')
    );

#### In the component that you want to use the Store, import the store from the location where you create it and use it as a hook

...
    import { usePeopleState} from './PeopleStore';
...

    const [{url},dispatch] = usePeopleState();


#### Now you can use the Const(s) and the dispatch function as expected


### MakeStore

#### Usage:

#### _import {makeStore} from "react-crud-plus-state-management"_

##### Then define an initialState object and a reducer function

##### Finally create a new store with the name that you want

* sample

``` javascript
    import 

    const initialState = {
        count:0,
        url: 'http://localhost:5000/People'
        ...
    };
    const peopleReducer = (state, action) => {
        switch (action.type) {
            case actions.FIELDS: {
            return {
                ...state,
                [action.fieldName]: action.payload,
            };,
            }
            }
        default:
            return state;
        }
    };

    const [
    PeopleProvider,
    usePeopleStore
    usePeopleDispatch
    ] = makeStore2(peopleReducer, initialState)

    export { PeopleProvider, usePeopleStore, usePeopleDispatch }
```

#### and Wrap the Components that need the store in the provider

"index.js"

    ReactDOM.render(
    <React.StrictMode>
            ....
            <PeopleProvider>
            <App />
            </PeopleProvider>
            ....
    </React.StrictMode>,
    document.getElementById('root')
    );

#### In the component that you want to use the Store, import the store and the dispatch from the locations where you create them and use it as a hook
...
    import { usePeopleStore, usePeopleDispatch} from './PeopleStore';
...

    const {url} = usePeopleStore();
    const dispatch = usePeopleDispatch();

#### Now you can use the Const(s) and the dispatch function as expected

## Using the CRUD

##### As indicated in react query documentation 

* In main app 

#### _import { QueryClientProvider, QueryClient } from "react-query";_

##### then; Create new QueryClient

    ** const queryClient = new QueryClient(); **

##### then; Wrap elements that need the server state

    * <QueryClientProvider client={queryClient}> 

* sample

```javascript
    ...
    const App=() => {
    return (
        <QueryClientProvider client={queryClient}>
        <Navbar />
        ... other components as required
        </QueryClientProvider>
    )
    }
```

### useRetrieve
##### For retrieving data <<=>> axios.get 

#### Usage:

#### _import {useRetrieve} from "react-crud-plus-state-management"_

###### Then inside a React functional Component - since it's a hook, it must follow hook rules

###### Define the following destructure const to be used. 

#### const {data, error, isLoading, isError} = useRetrieve("tag",url,onSuccess(optional))

###### destructure const

    * data: is the information fetch from the server for the specified url.
    * error: for receiving errors if those happen.
    * isLoading: boolean flag indicting if true that data is been fetch from the server.
    * isError: that is a boolean flag that if it's return as true an error occurred *

###### Props  

    * "<tag>" unique tag that you want to use for the collection of a given data set. This is the react query Key.**
    * url is the API end point.
    * you can use the state management to hold this data *
    * onSuccess is a function that you can pass as a parameter that will be executed if the fetch was successful, like loading a counter, or sending a message, etc.**

* sample

```javascript
    import
    ...

    export default function ListTasks() {
    ...
    const {url} = useTaskStore();  // ...url: 'http://localhost:5000/tasks'
    const onSuccess=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'taskCount', payload:data.length})}
    const {data:tasks, error, isLoading, isError} = useRetrieve("<"tag">",url, onSuccess);
```

### useDelete
##### For deleting data <<=>> axios.delete 

#### Usage: 

#### _import {useDelete} from "react-crud-plus-state-management"_

###### Then inside a React functional Component - since it's a hook, it must follow hook rules.

###### Define the following destructure const to be used. 

#### const {isLoading:loadingDel, remove, error:errorDel,  isError:isErrorDel} = useDelete("tag",url,onSuccess(optional)) 

###### destructure const

    * isLoading renamed as loadingDel in this case, since isLoading probably will be used with the {useRetrieve} in the same component, if not disregard.: boolean indicating if true that the http operation is happening on the server
    * remove: the delete function that is inside the useDelete hook, it expects the id that most be passed for example in an Onclick event like-> onClick={()=>remove(<tagUsed>.id)}.
    * error for receiving errors if those happen.
    * isLoading boolean flag indicting if true that data is been fetch from the server.
    * isError renamed as isErrorDel that is a boolean flag that if it's return as true an error occurred *

###### props:

    * "<tag>" the given tag use in the react query ...most match the one used in the useRetrieve.
    * url is the API end point. * you can use the state management to hold this data. The function  will build the uri using the id that the function receives in the onClick event to trigger the deletion*
    * onSuccess => Optional if we want to do any actions after the deletion. i.e nofify successful deletion


* sample  
```javascript
    ...
    import {useDelete} from '../../customHooks/reactQuery/useDelete';
    import { useTaskStore} from '../../context/tasks/TaskStore';
    import { useGlobalDispatch} from '../../context/GlobalStore';

    export default function ListTasks() {
    const {url} = useTaskStore();
    const onSuccessDel = ()=>{
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: {message:'Deleted Successfully',isOpen:true, type:'error'}});
        dispatch({type:actions.SET_COUNT, payload:-1});
    }
    const {isLoading:loading, remove} = useDelete("people",url,onSuccessDel)
    Return(
    ...
    <button onClick={()=>remove(person.id)}>Delete</button>
    ...
    )
    }
```

### useUpdate
##### For updating data <<=>> axios.put 

#### Usage: 

#### _import {useUpdate} from "react-crud-plus-state-management"_

###### Then inside a React functional Component - since it's a hook, it must follow hook rules.

###### Define the following destructure const to be used. 

#### const {isLoading:loadingUpd, update, error:errorUpd,  isError:isErrorUpd} = useUpdate("tag",url, onSuccess(optional))

###### destructure const

    * isLoading renamed as loadingUpd in this case,since isLoading probably will be used with the {useRetrieve} in the same component, if not disregard: boolean indicating if true that the http operation is happening on the server
    * update: the update function that is inside the useUpdate hook, it expects expects the <data with id> that most be passed on the onFormSubmit event. 
    * error for receiving errors if those happen.
    * isLoading boolean flag indicting if true that data is been fetch from the server.
    * isError renamed as isErrorUpd that is a boolean flag that if it's return as true an error occurred *

###### props:

    * "<tag>" the given tag use in the react query ...most match the one used in the useRetrieve.
    * url is the API end point. * you can use the state management to hold this data. The function  will build the uri using the id that the function receives from <data with id> in the onClick event to trigger the update*
    * onSuccess => Optional if we want to do any actions after the updating  i.e nofify successful update

###### Then define a onFormSubmit function to handle the updated(data) coming from a Form. This could be a react-hook-form too.

```javascript
    const OnFormSubmit = (data) => {
        update(data)
        ...
    }
```
* sample  
```javascript
    ...
    import {useUpdate} from '../../customHooks/reactQuery/useUpdate';
    import { useTaskStore} from '../../context/tasks/TaskStore';
    import { useGlobalDispatch} from '../../context/GlobalStore';

    export default function UpdateTask = () => {
    const {task,url} = useTaskStore();
    const globalDispatch=useGlobalDispatch();
    
    const onSuccessUpd = ()=>{
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:'Updated Successfully',isOpen:true, type:'success'}});
    }
    const {isLoading:loadingUpd, update} = useUpdate("tasks",url,onSuccessUpd)

    const OnFormSubmit = (data) => {
        update(data)
        ...
        history.push("/");
    }

    return (
        <TaskForm onFormSubmit={OnFormSubmit} defaultValues={task} isLoading={loadingUpd}/>
        // <TaskForm onFormSubmit={onFormSubmit}/>
    )
    };
```

### useCreate
##### For creating data <<=>> axios.post 

#### Usage: 

#### _import {useCreate} from "react-crud-plus-state-management"_

###### Then inside a React functional Component - since it's a hook, it must follow hook rules.

###### Define the following destructure const to be used. 

###### const {isLoading:loadingAdd, create, error, isError}  = useCreate("tag",url,onSuccess(optional))

###### destructure const

    * isLoading renamed as loadingAdd in this case,since isLoading probably will be used with the {useRetrieve} in the same component, if not disregard: boolean indicating if true that the http operation is happening on the server
    * create: the create function that is inside the useCreate hook, it expects expects the <data> that most be passed on the onFormSubmit event. 
    * error for receiving errors if those happen.
    * isLoading boolean flag indicting if true that data is been fetch from the server.
    * isError renamed as isErrorAdd that is a boolean flag that if it's return as true an error occurred *

###### props:

    * "<tag>" the given tag use in the react query ...most match the one used in the useRetrieve.
    * url is the API end point.  you can use the state management to hold this data. 
    * onSuccess => Optional if we want to do any actions after the updating  i.e nofify successful created

###### Then define a onFormSubmit function to handle the updated(data) coming from a Form. This could be a react-hook-form too.

    const OnFormSubmit = (data) => {
        create(data)
        ...
    }

* sample:
```javascript
...
    import {useCreate} from '../../customHooks/reactQuery/useCreate';
    import { useTaskStore} from '../../context/tasks/TaskStore';
    import { useGlobalDispatch} from '../../context/GlobalStore';

    export default function AddTask = () => {
    const {url} = useTaskStore();
    const globalDispatch=useGlobalDispatch();
    
    const onSuccessAdd = ()=>{
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:'Added Successfully',isOpen:true, type:'success'}});
        dispatch({type:actions.SET_COUNT, payload:1});
    }
    const {isLoading:loadingAdd, create} = useCreate("tasks",url,onSuccessAdd)

    const OnFormSubmit = (data) => {
        create(data)
        history.push("/");
    }

    return (
        <TaskForm onFormSubmit={OnFormSubmit} defaultValues={initialState.task} isLoading={loadingAdd}/>
    )
    };
```
