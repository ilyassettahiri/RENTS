<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use Carbon\Carbon;

class UpdateReservationStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservations:check-out-soon';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update reservation status to "checking out" one day before reservations end';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Get tomorrow's date
        $tomorrow = Carbon::tomorrow()->startOfDay();

        // Find reservations ending tomorrow
        $reservations = Reservation::where('status', 'active')
            ->whereDate('reservationsend', $tomorrow)
            ->get();

        foreach ($reservations as $reservation) {
            $reservation->update(['status' => 'checking out']);
            $this->info("Reservation ID {$reservation->id} updated to 'checking out'");
        }

        $this->info('Reservations updated successfully.');
        return 0;
    }
}
