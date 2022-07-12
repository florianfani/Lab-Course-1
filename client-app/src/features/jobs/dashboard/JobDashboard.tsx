
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Button, Grid, GridColumn, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Job } from "../../../app/models/job";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import JobDetails from "../details/JobDetails";
import JobForm from "../form/JobForm";
import JobFilters from "./JobFilters";
import JobList from "./JobList";
import JobListItemPlaceholder from "./JobListItemPlaceholder";



export default observer(function JobDashboard(){

    const {jobStore} = useStore();
    const {loadJobs, jobRegistry, setPagingParams, pagination} = jobStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadJobs().then(() => setLoadingNext(false));
    }


    useEffect(() =>{
      if(jobRegistry.size <= 1) loadJobs();
    }, [jobRegistry.size, loadJobs])
  
    
  
  
    
   
    return(
        <Grid>
            <Grid.Column width='10'>
                {jobStore.loadingInitial && !loadingNext ? (
                    <>
                        <JobListItemPlaceholder />
                        <JobListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <JobList />
                    </InfiniteScroll>
                )}
                

            </Grid.Column>
            <GridColumn width='6'>
                <JobFilters />
            </GridColumn>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})