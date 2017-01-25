<?php include "header.php"; ?>

<h2>Directory</h2>
<p style="margin-bottom:2%;">Select a tenant to edit.</p>
<a class="btn" href="./tenant-edit.php?id=new">Add Tenant</a>

<table id="tenant" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Location</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Location</th>
            </tr>
        </tfoot>
    </table>
    
<?php include "footer.php"; ?>